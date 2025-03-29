import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Link, useNavigate, useParams } from "react-router-dom";
import { paths } from "@/constants/paths";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useEffect } from "react";
import { toast } from "sonner";
import { MAX_FILE_SIZE } from "@/constants";
import nonprofitService from "@/services/nonprofit";

const getFormSchema = (isEdit: boolean) =>
  z.object({
    title: z.string().min(2, "Title is required!").max(50),
    description: z.string(),
    address: z.string().min(2, "Address is required"),
    causes: z.string(),
    established: z.string().min(2, "Establishment date is required"),
    isVerified: z.boolean().optional(),
    verified: z.string().optional(),
    taxId: z.string().min(2, "Tax Id is required"),
    images: isEdit
      ? z.any().optional()
      : z
          .instanceof(FileList, { message: "Images are required" })
          .transform((list) => Array.from(list))
          .refine(
            (files) => {
              const allowedTypes: { [key: string]: boolean } = {
                "image/jpeg": true,
                "image/png": true,
                "application/pdf": true,
                "application/msword": true,
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                  true,
              };
              return files.every((file) => allowedTypes[file.type]);
            },
            {
              message:
                "Invalid file type. Allowed types: JPG, PNG, PDF, DOC, DOCX",
            }
          )
          .refine(
            (files) => files.every((file) => file.size <= MAX_FILE_SIZE),
            {
              message: "File size should not exceed 5MB",
            }
          ),
  });

interface ActionFormProps {
  type: "create" | "edit";
}

export function ActionForm({ type }: ActionFormProps) {
  const isEdit = type === "edit";
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: editData } = useQuery({
    queryKey: [QUERY_KEYS.ADMIN_NONPROFIT_DETAIL, id],
    queryFn: () => nonprofitService.getById(id!),
    enabled: isEdit,
  });

  const { mutateAsync } = useMutation({
    mutationFn: isEdit ? nonprofitService.edit : nonprofitService.create,
    onSuccess: () => {
      navigate(paths.DASHBOARD.NONPROFIT.LIST);
    },
  });

  const formSchema = getFormSchema(isEdit);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      address: "",
      causes: "",
      established: "",
      isVerified: false,
      verified: "",
      taxId: "",
      images: [],
    },
  });

  useEffect(() => {
    if (isEdit && editData?.data?.item) {
      const {
        title,
        description,
        address,
        causes,
        established,
        verified,
        taxId,
        status,
      } = editData.data.item;

      form.reset({
        title,
        description,
        address,
        causes,
        established,
        isVerified: status === "verified",
        verified: verified || "",
        taxId,
        images: [],
      });
    }
  }, [editData, form, isEdit]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const finalStatus = values.isVerified ? "verified" : "unverified";

    const verifiedDate = values.isVerified ? values.verified : "";

    const payload = {
      id: isEdit ? id : undefined,
      title: values.title,
      description: values.description,
      address: values.address,
      causes: values.causes,
      established: values.established,
      status: finalStatus,
      verified: verifiedDate,
      taxId: values.taxId,
      images: values.images,
    };

    const promise = mutateAsync(payload);
    toast.promise(promise, {
      loading: isEdit ? "Updating nonprofit..." : "Creating nonprofit...",
      success: isEdit
        ? "Nonprofit updated successfully"
        : "Nonprofit created successfully",
      error: isEdit
        ? "Failed to update nonprofit"
        : "Failed to create nonprofit",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="causes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Causes</FormLabel>
              <FormControl>
                <Input placeholder="Causes" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="established"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Establishment Date</FormLabel>
              <FormControl>
                <Input placeholder="Established date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="taxId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tax Id</FormLabel>
              <FormControl>
                <Input placeholder="Tax Id" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Type..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isVerified"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
              <FormControl>
                <input
                  type="checkbox"
                  checked={field.value || false}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              </FormControl>
              <FormLabel>Is this nonprofit verified?</FormLabel>
            </FormItem>
          )}
        />

        {form.watch("isVerified") && (
          <FormField
            control={form.control}
            name="verified"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Verification Date</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Date of verification"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {!isEdit && (
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <Input
                    multiple
                    type="file"
                    accept="image/*,application/pdf,.doc,.docx"
                    onChange={(e) => {
                      field.onChange(e.target.files);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="flex justify-end mt-4 gap-2">
          <Button asChild variant="secondary">
            <Link to={paths.PROFILE.GOFUNDME.LIST}>Back</Link>
          </Button>
          <Button type="submit">
            {isEdit ? "Update Nonprofit" : "Create Nonprofit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

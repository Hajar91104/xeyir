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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import campaignService from "@/services/campaign";
import categoryService from "@/services/category";
import locationService from "@/services/location";
import { useEffect, useMemo } from "react";
import { toast } from "sonner";
import { MAX_FILE_SIZE } from "@/constants";
import { Category } from "@/types";

const getFormSchema = (isEdit: boolean) =>
  z.object({
    title: z.string().min(2, "Title is required!").max(50),
    description: z.string().min(10, "Description is required"),
    // updates: z.string(),
    currency: z.string(),
    goalAmount: z
      .number({
        invalid_type_error: "Goal Amount must be a number",
        required_error: "Goal Amount is required",
      })
      .positive(),
    category: z.string().min(2, { message: "Category is required" }),
    location: z.string().min(2, { message: "Location is required" }),
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
              return Array.from(files).every((file) => allowedTypes[file.type]);
            },
            {
              message:
                "Invalid file type. Allowed types: JPG, PNG, PDF, DOC, DOCX",
            }
          )
          .refine(
            (files) => {
              return files.every((file) => file.size <= MAX_FILE_SIZE);
            },
            {
              message: "File size should not exceed 5MB",
            }
          ),
  });

interface ActionFormProps {
  type: "create" | "edit";
}

const ActionForm = ({ type }: ActionFormProps) => {
  const isEdit = type === "edit";
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: editData, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.ADMIN_CAMPAIGN_DETAIL, id],
    queryFn: () => campaignService.getById(id!),
    enabled: isEdit,
  });

  const { mutateAsync } = useMutation({
    mutationFn: isEdit ? campaignService.edit : campaignService.create,
    onSuccess: () => {
      navigate(paths.PROFILE.GOFUNDME.LIST);
    },
  });

  const { data: categoryData } = useQuery({
    queryKey: [QUERY_KEYS.CATEGORIES],
    queryFn: categoryService.getAll,
  });

  const { data: locationData } = useQuery({
    queryKey: [QUERY_KEYS.LOCATIONS],
    queryFn: locationService.getAll,
  });

  const categoryOptions = useMemo(
    () =>
      categoryData?.data.items.map((category) => ({
        value: category._id,
        label: category.name,
      })) || [],
    [categoryData]
  );

  const locationOptions = useMemo(
    () =>
      locationData?.data.items.map((location) => ({
        value: location._id,
        label: location.name,
      })) || [],
    [locationData]
  );

  const formSchema = getFormSchema(isEdit);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      currency: "",
      goalAmount: 0,
      category: "",
      location: "",
      // updates: "",
      images: [],
    },
  });
  console.log(editData);

  useEffect(() => {
    if (isEdit && editData?.data?.item) {
      const {
        title,
        description,
        currency,
        goalAmount,
        category,
        location,
        // updates,
      } = editData.data.item;

      form.reset({
        title,
        description,
        currency,
        goalAmount,
        category: (category as any) || "",
        location: (location as any) || "",
        // updates,
        images: [],
      });
    }
  }, [editData, form, isEdit]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const payload = {
      id: isEdit ? id : undefined,
      title: values.title,
      description: values.description,
      currency: values.currency,
      // updates: values.updates || "",
      goalAmount: values.goalAmount,
      categoryId: values.category,
      locationId: values.location,
      images: values.images,
    };

    const promise = mutateAsync(payload);

    toast.promise(promise, {
      loading: isEdit ? "Updating campaign..." : "Creating campaign...",
      success: isEdit
        ? "Campaign updated successfully"
        : "Campaign created successfully",
      error: isEdit ? "Failed to update campaign" : "Failed to create campaign",
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
          name="currency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Currency</FormLabel>
              <FormControl>
                <Input placeholder="Currency" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="goalAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Goal Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Goal Amount"
                  {...field}
                  onChange={(e) => {
                    field.onChange({
                      target: { value: parseFloat(e.target.value) },
                    });
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category">
                      {
                        categoryOptions.find((cat) => cat.value === field.value)
                          ?.label
                      }
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categoryOptions.map(({ value, label }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location">
                      {
                        locationOptions.find((loc) => loc.value === field.value)
                          ?.label
                      }
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {locationOptions.map(({ value, label }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
        {/* {isEdit && (
          <FormField
            control={form.control}
            name="updates"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Update</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Type..."
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )} */}
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
                  accept="image/*"
                  onChange={(e) => {
                    field.onChange(e.target.files);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end mt-4">
          <Button asChild variant="secondary">
            <Link to={paths.PROFILE.GOFUNDME.LIST}>Back</Link>
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default ActionForm;

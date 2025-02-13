import { DataTable } from "@/components/shared/DataTable";
import { contributionColumns } from "./components/ContributionColumns";

const ContributionsPage = () => {
  const items = [
    {
      date: "10.02.2024",
      currency: "USD",
      amount: 20,
      tip: 3.5,
      title: "Support Sidhu's Family After His Sudden Loss",
      id: "123",
    },
  ];
  return (
    <div>
      <h1 className="font-semibold text-2xl py-6">Your Contributions</h1>
      <DataTable columns={contributionColumns} data={items} />
    </div>
  );
};

export default ContributionsPage;

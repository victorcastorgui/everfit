import Card from "@/components/Card";
import PageTitle from "@/components/PageTitle";
import { Purchase } from "@/types/types";
import { API_URL } from "@/utils/API_URL";
import { fetcher } from "@/utils/Fetcher";
import { IDRFormat } from "@/utils/IDRFormat";
import { CChart } from "@coreui/react-chartjs";
import useSWR from "swr";

function Dashboard() {
  const { data, isLoading } = useSWR<Purchase[]>(
    `${API_URL}/purchases`,
    fetcher
  );

  const { data: merchList } = useSWR<Purchase[]>(`${API_URL}/merchs`, fetcher);
  const { data: eventList } = useSWR<Purchase[]>(`${API_URL}/events`, fetcher);

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const calculateProfitByMonth = (data: Purchase[]) => {
    const arrData = Array(12).fill(0);

    for (let i = 1; i <= 12; i++) {
      for (const dataItem of data) {
        if (new Date(dataItem.purchaseDate).getMonth() === i) {
          arrData[i - 1] = arrData[i - 1] + dataItem.paymentTotal;
        }
      }
    }
    return { arrData };
  };

  return (
    <div className="flex">
      <div className="w-[15%]"></div>
      <div className="w-[85%] h-fit flex flex-col items-center border-[2px]">
        <PageTitle>Dashboard</PageTitle>
        <div className="flex w-[70%] gap-[1rem] justify-between mt-[4rem]">
          <Card title={"Total Profit"}>
            {IDRFormat.format(
              data?.reduce((acc, curr) => acc + curr.paymentTotal, 0) as number
            )}
          </Card>
          <Card title={"Total Merchandises"}>{merchList?.length}</Card>
          <Card title={"Total Events"}>{eventList?.length}</Card>
        </div>
        <div className="w-[60rem] my-[4rem]">
          <CChart
            type="bar"
            data={{
              labels: labels,
              datasets: [
                {
                  label: "Total Earnings (Event + Merch)",
                  backgroundColor: "rgba(151, 187, 205, 1)",
                  borderColor: "rgba(151, 187, 205, 1)",
                  pointBackgroundColor: "rgba(151, 187, 205, 1)",
                  pointBorderColor: "#fff",
                  data: !isLoading
                    ? calculateProfitByMonth(data as Purchase[]).arrData
                    : [],
                },
              ],
            }}
            options={{
              plugins: {
                legend: {
                  labels: {
                    color: "black",
                  },
                },
              },
              scales: {
                x: {
                  grid: {
                    color: "black",
                  },
                  ticks: {
                    color: "black",
                  },
                },
                y: {
                  grid: {
                    color: "black",
                  },
                  ticks: {
                    color: "black",
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

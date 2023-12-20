import PageTitle from "@/components/PageTitle";
import { CChart } from "@coreui/react-chartjs";

function Dashboard() {
  return (
    <div className="flex">
      <div className="w-[15%]"></div>
      <div className="w-[85%] flex flex-col items-center border-[2px]">
        <PageTitle>Dashboard</PageTitle>
        <div className="w-[50rem] h-[50rem]">
          <CChart
            type="line"
            data={{
              labels: [
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
              ],
              datasets: [
                {
                  label: "Event Earnings",
                  backgroundColor: "rgba(220, 220, 220, 0.2)",
                  borderColor: "rgba(220, 220, 220, 1)",
                  pointBackgroundColor: "rgba(220, 220, 220, 1)",
                  pointBorderColor: "#fff",
                  data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
                },
                {
                  label: "Merch Earnings",
                  backgroundColor: "rgba(151, 187, 205, 0.2)",
                  borderColor: "rgba(151, 187, 205, 1)",
                  pointBackgroundColor: "rgba(151, 187, 205, 1)",
                  pointBorderColor: "#fff",
                  data: [50, 12, 28, 29, 7, 25, 12, 70, 60],
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

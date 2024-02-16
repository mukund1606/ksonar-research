import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ReportCard from "@/components/ReportCard";
import { api } from "@/trpc/server";

export const dynamic = "force-dynamic";

export default async function Home() {
  const reports = await api.report.getAllReports.query();
  return (
    <>
      <div className="mt-4 flex flex-col items-center gap-24 px-4 md:px-8 xl:px-12">
        <HeroSection reports={reports} />
        <div>
          <h1 className="mb-4 mt-8 text-center text-4xl font-bold">
            Latest Reports
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {reports.slice(0, 4).map((report) => (
              <ReportCard report={report} key={report.id} />
            ))}
          </div>
        </div>
        <div>
          <h1 className="mb-4 mt-8 text-center text-4xl font-bold">
            Top Reports
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {reports
              .filter((report) => report.isTopReport)
              .slice(0, 4)
              .map((report) => (
                <ReportCard report={report} key={report.id} />
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

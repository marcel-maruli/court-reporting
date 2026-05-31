import MainLayout from "@/components/MainLayout";
import QueryProvider from "@/components/QueryProvider";

export default function Home() {
  return (
    <main>
      <QueryProvider>
        <MainLayout></MainLayout>
      </QueryProvider>
    </main>
  );
}

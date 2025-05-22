import PageContent from "@/components/PageContent";
import { getPage } from "@/lib/contentstack";

export const dynamic = "force-static";
export const revalidate = 60;

export const generateStaticParams = async () => {
  return [{ path: "/" }];
};

export default async function Page() {
  const page = await getPage("/", "");
  return <>{page && <PageContent initialPage={page} />}</>;
}

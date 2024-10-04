import { IEntityCommit } from '@/types/commits/IEntityCommit';

export const SAMPLE_COMMITS: IEntityCommit[] = [
  {
    id: '1',
    commit_name: 'Update funnel',
    diff: "diff --git a/src/components/LargeComponent.tsx b/src/components/LargeComponent.tsx\nindex 83c8a4a..0e9962c 100644\n--- a/src/components/LargeComponent.tsx\n+++ b/src/components/LargeComponent.tsx\n@@ -1,12 +1,32 @@\n-import { Card, Empty } from 'antd';\n+import { Card } from 'antd';\n\n+\n+const ENDPOINT_URL = '/api/data';\n \n export default function LargeComponent(): React.ReactNode {\n+  const { isLoading, data } = useState(false);\n+  const items = data?.data || [];\n+\n   return (\n     <section style={{ marginBottom: 48, padding: 16 }}>\n       <h2 style={{ fontSize: 24, marginBottom: 16 }}>Details</h2>\n-      <Card>\n-        <Empty description='Missing implementation' />\n-      </Card>\n+      <div style={{\n+        backgroundColor: 'white',\n+      }}>\n+        {isLoading ? <Card loading></Card> : null}\n+        {!isLoading && items.length ? <div style={{ height: 300 }}>\n+          <Funnel data={items} />\n+        </div> : null}\n+      </div>\n     </section>\n   );\n }\n",
  },
];

import { IEntityCommit } from '@/types/commits/IEntityCommit';

export const SAMPLE_COMMITS: IEntityCommit[] = [
  {
    id: '1',
    commit_name: 'LargeComponent Updated',
    diff: "diff --git a/src/components/LargeComponent.tsx b/src/components/LargeComponent.tsx\nindex 83c8a4a..0e9962c 100644\n--- a/src/components/LargeComponent.tsx\n+++ b/src/components/LargeComponent.tsx\n@@ -1,12 +1,32 @@\n-import { Card, Empty } from 'antd';\n+import { Card } from 'antd';\n\n+\n \n export default function LargeComponent({ isLoading, data }): React.ReactNode {\n+  const items = data?.data || [];\n+\n   return (\n     <div style={{ marginBottom: 8, padding: 8 }}>\n       <h2 style={{ fontSize: 14, marginBottom: 8 }}>Details</h2>\n-      <Card>\n-        <h1>{'Item'}</h1>\n-      </Card>\n+      <div style={{\n+        backgroundColor: '#FFFFFF',\n+      }}>\n+        {isLoading ? <Card loading></Card> : null}\n+        {!isLoading && items.length ? <div style={{ height: 400 }}>\n+          <ItemData data={items} />\n+        </div> : null}\n+      </div>\n     </div>\n   );\n }\n",
  },
];

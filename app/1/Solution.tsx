import { Card, Col, Divider, List, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import DiffRenderer from "./DiffRenderer";

interface Commit {
  id: string;
  name: string;
  diff: string;
  value?: string;
  label?: string;
}

interface FileDiffs {
  [key: string]: string;
}

export default function DiffViewerContainer(): React.ReactNode {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [selectedCommit, setSelectedCommit] = useState<Commit | undefined>(undefined);
  const [files, setFiles] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | undefined>(undefined);
  const [fileDiffs, setFileDiffs] = useState<FileDiffs>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchData = async (url: string): Promise<any> => {
    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  function getUniqueFilesFromGitDiff(diffString: string): string[] {
    const filePattern = /^diff --git a\/(.+?) b\/\1$/gm;
    const files = new Set<string>();
    let match: RegExpExecArray | null;

    while ((match = filePattern.exec(diffString)) !== null) {
      files.add(match[1]);
    }

    return Array.from(files);
  }

  function extractFileDiffs(diffString: string): FileDiffs {
    const fileDiffs: FileDiffs = {};
    const filePattern = /^diff --git a\/(.+?) b\/\1$/gm;
    let match: RegExpExecArray | null;

    while ((match = filePattern.exec(diffString)) !== null) {
      const fileName = match[1];
      const startIndex = match.index;
      const endIndex = diffString.indexOf('diff --git', startIndex + 1);
      const fileDiff = diffString.slice(startIndex, endIndex === -1 ? undefined : endIndex);

      fileDiffs[fileName] = fileDiff;
    }

    return fileDiffs;
  }

  function updateData(commit: Commit) {
    setSelectedCommit(commit);
    const diffs = extractFileDiffs(commit.diff);
    setFileDiffs(diffs);

    const files = getUniqueFilesFromGitDiff(commit.diff);
    setFiles(files);
    setSelectedFile(files[0]);
  }

  useEffect(() => {
    fetchData('/api/commits').then((commits: Commit[]) => {
      const transformedCommits = commits?.map(commit => ({
        ...commit,
        value: commit.name,
        label: commit.name
      }));
      setCommits(transformedCommits);

      if (transformedCommits?.length > 0) {
        updateData(transformedCommits[0]);
      }
    });
  }, []);

  const handleCommitChange = (value: string) => {
    const newCommitData = commits.find(obj => obj.name === value);
    if (newCommitData) {
      updateData(newCommitData);
    }
  };

  return (
    <div>
      <Card>
        <div>
          <label>Commits</label>
        </div>
        <Select
          value={selectedCommit?.name}
          style={{ width: 520 }}
          onChange={handleCommitChange}
          options={commits}
          loading={loading}
        />
      </Card>
      <Row style={{ height: '80vh' }}>
        <Col span={8} style={{ height: '80vh' }}>
          <Card style={{ height: '80vh', overflow: "scroll" }}>
            <div>
              <label>Files</label>
            </div>
            <Divider style={{ marginTop: "4px" }} />
            <List
              dataSource={files}
              renderItem={(item) => (
                <List.Item
                  style={{
                    background: selectedFile === item ? "#e5efff" : "",
                    borderRadius: "5px",
                    cursor: "pointer",
                    padding: "4px"
                  }}
                  onClick={() => setSelectedFile(item)}
                >
                  {item}
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={16} style={{ height: '80vh' }}>
          <Card style={{ height: '80vh', overflow: "scroll" }}>
            <div>
              <h3>{selectedFile}</h3>
              {selectedFile && (
                <pre>
                  <DiffRenderer diff={fileDiffs[selectedFile]} />
                </pre>
              )}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

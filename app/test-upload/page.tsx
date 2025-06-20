import { UploadDiagnostics } from "@/components/debug/UploadDiagnostics";

export default function UploadTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Upload Diagnostics</h1>
        <UploadDiagnostics />
      </div>
    </div>
  );
}

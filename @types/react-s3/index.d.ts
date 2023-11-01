declare module "react-s3" {
  interface S3Config {
    bucketName: string;
    dirName?: string;
    region: string;
    accessKeyId: string;
    secretAccessKey: string;
  }

  interface S3UploadResponse {
    bucket: string;
    key: string;
    location: string;
  }

  interface S3DeleteResponse {
    ok: boolean;
    status: number;
    message: string;
    fileName: string;
  }

  class S3FileUpload {
    static uploadFile: (
      file: File,
      config: S3Config
    ) => Promise<S3UploadResponse>;

    static deleteFile: (
      file: File,
      config: S3Config
    ) => Promise<S3DeleteResponse>;
  }

  const { uploadFile } = S3FileUpload;

  export { uploadFile };
  export default S3FileUpload;
}

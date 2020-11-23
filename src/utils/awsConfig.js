import { Storage } from "aws-amplify";

const config = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "minions-uploads",
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://0ddwa81d3k.execute-api.us-east-1.amazonaws.com/dev",
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_oRkW90t0v",
    APP_CLIENT_ID: "2gq1m1bkkgsa2j2dqcm1lfkch0",
    IDENTITY_POOL_ID: "us-east-1:31e92272-473d-41fc-bcc7-6994fd048034",
  },
};

export default config;

export async function s3Upload(file) {
  const filename = `${Date.now()}`;

  const stored = await Storage.vault.put(filename, file, {
    contentType: file.type,
  });

  return stored.key;
}

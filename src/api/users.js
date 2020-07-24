import remote from "@/utils/remote";

export const getContentPagedData = async params => {
  return await remote.post({
    url: remote.api,
    data: params
  });
};

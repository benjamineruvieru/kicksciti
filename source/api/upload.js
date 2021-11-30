import {BASEURL, axiosBase} from './base';

export const uploadProfile = async ({uploadUrl, path, type}) => {
  const res = await fetch(path);
  const imgBlob = await res.blob();

  return await fetch(uploadUrl, {
    method: 'PUT',
    headers: {'Content-Type': type},
    body: imgBlob,
  });
};

export const requestUploadUrl = ({type = 'image/png'}) => {
  const axiosinstance = axiosBase();
  const res = axiosinstance.post(`${BASEURL}/file-uploads`, {
    type,
  });
  return res;
};

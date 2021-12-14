import {BASEURL, axiosBase} from './base';

export const uriToBlob = uri => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      // return the blob
      resolve(xhr.response);
    };
    xhr.onerror = function () {
      reject(new Error('uriToBlob failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);

    xhr.send(null);
  });
};

export const uploadProfile = async ({uploadUrl, path, type}) => {
  const imgBlob = await uriToBlob(path);

  return await fetch(uploadUrl, {
    method: 'PUT',
    headers: {'Content-Type': type},
    body: imgBlob,
  });
};

export const requestUploadUrl = ({
  type = 'image/png',
  purpose = 'profile-pic',
}) => {
  const axiosinstance = axiosBase();
  const res = axiosinstance.post(`${BASEURL}/get-upload-url`, {
    type,
    purpose,
  });
  return res;
};

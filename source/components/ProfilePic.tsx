import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import {useMMKVString} from 'react-native-mmkv';
import {launchImageLibrary} from 'react-native-image-picker';
import {requestUploadUrl, uploadProfile} from '../api/upload';
import {updateProfilePic} from '../api/user';
import {showNotification} from '../utilis/Functions';

const no_img = require('../assets/images/no.png');
const ProfilePic = () => {
  const [temp, setTemp] = useState<string | undefined>();
  const [user, setUser] = useMMKVString('userdetails');
  const {picture} = JSON.parse(user ?? '{}');
  console.log(picture);
  const open = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1,
      });
      if (!result.didCancel) {
        console.log(result.assets);
        const {type, uri} = result?.assets[0];
        setTemp(uri);
        const {data} = await requestUploadUrl({type});
        const {publicUrl, signedUrl} = data;
        console.log('re', data);
        await uploadProfile({uploadUrl: signedUrl, path: uri, type});
        const res = await updateProfilePic({picture: publicUrl});
        setUser(JSON.stringify(res?.data?.user));
        console.log('final res', res.data);
      }
    } catch (err) {
      const errorMessage = err?.response?.data?.error || 'An error occurred';
      showNotification({error: true, msg: errorMessage});
    }
  };
  return (
    <TouchableOpacity onPress={open}>
      <FastImage
        source={temp ? {uri: temp} : picture ? {uri: picture} : no_img}
        style={styles.profileImage}
      />
    </TouchableOpacity>
  );
};

export default ProfilePic;

const styles = StyleSheet.create({
  profileImage: {
    height: 80,
    width: 80,
    borderRadius: 360,
  },
});

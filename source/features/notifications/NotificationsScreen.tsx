import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Mainbackground from '../../components/Mainbackground';
import PageHeader from '../../components/PageHeader';

const NotificationsScreen = () => {
  return (
    <Mainbackground padding={20}>
      <PageHeader title={'Notifications'} />
    </Mainbackground>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({});

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {FlashList} from '@shopify/flash-list';
import {SmallText, SmallTextB} from '../../../../components/Text';
import FastImage from 'react-native-fast-image';
import {getPercentWidth} from '../../../../utilis/Functions';
import {SCREEN_WIDTH} from '../../../../constants/Variables';
import Button from '../../../../components/Button';
import LoveOutline from '../../../../assets/svg/icons/love-outline.svg';
import Love from '../../../../assets/svg/icons/love.svg';
import Colors from '../../../../constants/Colors';

const DATA = [
  {
    originalprice: '5500',
    picnumber: '2',
    link2:
      'https://firebasestorage.googleapis.com/v0/b/earn-crypto-2da43.appspot.com/o/sto%2FLogopit_1612027985062.jpg?alt\u003dmedia\u0026token\u003da9a6d2b8-97cd-48b3-b630-50623ae7d4d2',
    tag: 'null',
    size: '44 - 48',
    stock: 'yes',
    date: '202102012008',
    dealer: 'Oma',
    link3: '',
    link1:
      'https://firebasestorage.googleapis.com/v0/b/earn-crypto-2da43.appspot.com/o/sto%2FLogopit_1612028980509.jpg?alt\u003dmedia\u0026token\u003d2bfb154e-1399-4a3b-a9ee-16c47f8687f2',
    link4: '',
    price: '8500',
    id: '#0001',
    brand: 'nike',
    color: 'As Seen',
    name: 'Nike Air Max',
    text: 'Nike Air Max\n\nN8500\n\n44 - 48',
    link5: '',
    type: 'shoe',
    keywords: '8500,max,black,nike',
  },
  {
    picnumber: '1',
    originalprice: '20000',
    link2: '',
    tag: 'hot',
    size: '41 - 45',
    stock: 'yes',
    date: '202102012002',
    dealer: 'B13',
    link3: '',
    link1:
      'https://firebasestorage.googleapis.com/v0/b/earn-crypto-2da43.appspot.com/o/sto%2Fpic1Nike%20Air%20Force%201%20Low%20Black?alt\u003dmedia\u0026token\u003dabd1d559-f241-47e0-95b1-8d23d6205a4f',
    link4: '',
    price: '24,000',
    id: '#0004',
    brand: 'nike',
    color: 'As Seen',
    name: 'Nike Air Force 1 Low Black',
    grade: 'top',
    link5: '',
    type: 'shoe',
    keywords: 'black,24k,24000,airforce,air force,nike',
  },
  {
    picnumber: '3',
    originalprice: '4500',
    link2:
      'https://kicksciti2.sirv.com/Kicks%20Citi/sho.plux-20210414-0001.jpg',
    tag: 'null',
    size: '42 - 46',
    stock: 'yes',
    date: '202102012003',
    dealer: 'Oma',
    link3:
      'https://kicksciti2.sirv.com/Kicks%20Citi/sho.plux-20210414-0002.jpg',
    link1:
      'https://kicksciti2.sirv.com/Kicks%20Citi/sho.plux-20210414-0003.jpg',
    link4: '',
    price: '7000',
    brand: 'vans',
    id: '#0005',
    color: 'As Seen',
    grade: 'low',
    name: 'Vans Old Skool',
    link5: '',
    type: 'shoe',
    keywords: 'van,vans,7000, old school,old skool, black and white',
  },
  {
    picnumber: '1',
    originalprice: '6000',
    link2: '',
    tag: 'hot',
    size: '42 - 45',
    stock: 'no',
    url: '',
    date: '202102012004',
    dealer: 'Oma',
    link3: '',
    link1:
      'https://firebasestorage.googleapis.com/v0/b/earn-crypto-2da43.appspot.com/o/sto%2Fpic1Nike%20SB%20Dunk?alt\u003dmedia\u0026token\u003d232de9e6-fc32-4800-9b27-31fbc5e7581c',
    link4: '',
    price: '9000',
    id: '#0006',
    brand: 'nike',
    color: 'As Seen',
    name: 'Nike SB Dunk',
    grade: 'low',
    link5: '',
    type: 'shoe',
    keywords: 'sb,9k,9000,dunk,nike',
  },
  {
    originalprice: '7000',
    picnumber: '2',
    link2:
      'https://firebasestorage.googleapis.com/v0/b/earn-crypto-2da43.appspot.com/o/sto%2FLogopit_1613650246272.jpg?alt\u003dmedia\u0026token\u003dced3cf54-eea8-4c2a-a396-b94d6671c6d6',
    tag: 'hot',
    size: '42 - 45',
    stock: 'yes',
    date: '202102012010',
    dealer: 'Oma',
    link3: '',
    link1:
      'https://firebasestorage.googleapis.com/v0/b/earn-crypto-2da43.appspot.com/o/sto%2Fpic1Dior?alt\u003dmedia\u0026token\u003d6520be02-d437-4df3-b700-8f3a26c1b21e',
    link4: '',
    price: '10,000',
    id: '#0008',
    brand: 'dior',
    color: 'As Seen',
    name: 'Dior',
    text: 'Dior\n\nN10,000\n\n42 - 45',
    link5: '',
    type: 'shoe',
    keywords: 'dior,blue,10k,10000,white',
  },
  {
    picnumber: '3',
    originalprice: '6000',
    link2:
      'https://firebasestorage.googleapis.com/v0/b/earn-crypto-2da43.appspot.com/o/sto%2Fpic2Luminous%20Running%20Shoe?alt\u003dmedia\u0026token\u003d89161d4d-6bff-4343-abcc-edaf8092ed3c',
    tag: 'hot',
    size: '42 - 45',
    stock: 'no',
    url: '',
    date: '202102012007',
    dealer: 'Oma',
    link3:
      'https://firebasestorage.googleapis.com/v0/b/earn-crypto-2da43.appspot.com/o/sto%2Fpic3Luminous%20Running%20Shoe?alt\u003dmedia\u0026token\u003d1ed4de9a-4da4-419c-8c34-47050946d0b8',
    link1:
      'https://firebasestorage.googleapis.com/v0/b/earn-crypto-2da43.appspot.com/o/sto%2Fpic1Luminous%20Running%20Shoe?alt\u003dmedia\u0026token\u003d84b161a0-690c-4c6d-9a83-48989370d74e',
    link4: '',
    price: '9000',
    id: '#0009',
    brand: 'others',
    color: 'As Seen',
    name: 'Luminous Running Shoe',
    grade: 'low',
    link5: '',
    type: 'shoe',
    keywords: 'luminous, 9k, 9000, running,glow, rainbow',
  },
  {
    picnumber: '1',
    originalprice: '20000',
    link2: '',
    tag: 'hot',
    size: '40 - 45',
    stock: 'yes',
    date: '202102012001',
    dealer: 'B13',
    link3: '',
    link1:
      'https://firebasestorage.googleapis.com/v0/b/earn-crypto-2da43.appspot.com/o/sto%2Fpic1Nike%20Air%20Force%201%20Low%20Wheat%20Mocha?alt\u003dmedia\u0026token\u003dc9c8b15d-84fe-4f9e-b4f6-0bfbddbf2b85',
    link4: '',
    price: '24000',
    brand: 'nike',
    id: '#0010',
    color: 'As Seen',
    grade: 'top',
    name: 'Nike Air Force 1 Low Wheat Mocha',
    link5: '',
    type: 'shoe',
    keywords: 'brown,24k,24000,airforce,air force,wheat,mocha,nike',
  },
];

const ProductItem = ({item, index}) => {
  console.log('i', index, index % 2);
  const {name, link1, price} = item ?? {};
  return (
    <TouchableOpacity
      style={{
        marginBottom: 15,
        width: '100%',
        alignItems: index % 2 === 1 ? 'flex-end' : 'flex-start',
      }}>
      <View>
        <FastImage
          source={{uri: link1}}
          style={{
            height: (SCREEN_WIDTH - 40 - 10) / 2,
            width: (SCREEN_WIDTH - 40 - 10) / 2,
            borderRadius: 10,
          }}
        />
        <View style={{paddingVertical: 10}}>
          <View>
            <SmallTextB style={{marginBottom: 10, fontSize: 14}}>
              {name}
            </SmallTextB>
            <SmallText>N {price}</SmallText>
          </View>
          <TouchableOpacity></TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 5,
          }}>
          <Button title="Add to cart" width={35} small />
          {/* <Love width={25} color={Colors.primary} height={25} /> */}
          <LoveOutline color={Colors.primary} width={20} height={20} />
        </View>
      </View>
    </TouchableOpacity>
  );
};
const Products = () => {
  return (
    <View style={{flex: 1}}>
      <FlashList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={DATA}
        renderItem={ProductItem}
      />
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({});

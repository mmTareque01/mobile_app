import React from 'react';
import {ScrollView, View} from 'react-native';
import {Divider, Text} from 'react-native-paper';
import HeaderWithLogo from '../components/HeaderWithLogo';
import ScreenLabel from '../components/ScreenLabel';

const Aboutus = ({navigation}) => {
  return (
    <View>
      <HeaderWithLogo navigation={navigation} />
      <ScreenLabel title="About Us" />
      <ScrollView>
        <Text
          style={{
            textAlign: 'justify',
            padding: 20,
          }}>
          Abroad Inquiry was born in 2017 from an altruist Facebook group that
          has helped hundreds of international students pursue higher study
          abroad worldwide. Abroad Inquiry's a community-based platform run by a
          group of international students from different countries. Why was the
          Abroad Inquiry born? The common thing that we noticed is that students
          are being provided with false information and misleading career
          guidelines from unauthentic sources, resulting in the refusal of their
          visa application and career breakthrough. This is not a refusal; we
          think it’s the death of a dream. At our Abroad Inquiry, we provide all
          accurate factual information related to higher study abroad that we
          have acquired from our real-life experience and thorough research. We
          believe that a current student who has already gone through the hectic
          study abroad journey can be the best source of information and
          understand the situation better than others. The information obtained
          is more authentic than online sources or any other student consultancy
          firms. Thus, we have built this platform to help upcoming students.
          {'\n\n'}
          Our mentors have already graduated from top-notch universities in
          different countries. Moreover, some of them are working at reputed
          companies working relentlessly to ease the journey of potential future
          students. However, we decided to serve upcoming students because, as
          international students, we experienced the same thing before going to
          a new place. For instance, sufficient information, the difficulty of
          getting admission, preparation of necessary documents as per the
          requirement of the respective university, and visa consular office are
          essential to know from authentic sources. We have an expert team of
          passionate individuals who are professional to make your dream of
          studying abroad into a reality. Furthermore, we also provide
          comprehensive guidelines to manage housing, part-time jobs, study
          advice, Permanent Residency, etc.
          {'\n\n'}
          In a nutshell, our company provides complete support from admission to
          settlement in a foreign country. In addition, students will get all
          the support and motivation from our mentors who run this company.
          Therefore, let’s get in touch with us from the very first day of your
          planning stage.
          {'\n\n\n\n'}
        </Text>
      </ScrollView>
    </View>
  );
};

export default Aboutus;

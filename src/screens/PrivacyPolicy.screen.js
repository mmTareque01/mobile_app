import React from 'react';
import {ScrollView, View} from 'react-native';
import ScreenLabel from './../components/ScreenLabel';
import HeaderWithLogo from './../components/HeaderWithLogo';
import {
  Caption,
  Headline,
  List,
  Paragraph,
  Subheading,
  Text,
} from 'react-native-paper';

const PrivacyPolicy = ({navigation}) => {
  return (
    <View>
      <HeaderWithLogo navigation={navigation} />
      <ScreenLabel title="Privacy Policy" />
      <ScrollView contentContainerStyle={{padding: 20}}>
        <Subheading>Terms of Use:</Subheading>
        <Caption style={{textAlign: 'justify'}}>
          To start using the app, students need to provide some information so
          that they can get the highest possible accurate personalized
          information and suggestions regarding their higher education abroad.
          Nevertheless, the information given by the students on the app will
          remain confidential.
          {'\n\n'}
          All users can easily create an account here to get all the information
          about studying abroad and apply through Abroad Inquiry. Abroad Inquiry
          will be more than happy to inform the prospective students that Abroad
          Inquiry has experts for all major study destinations. The aspirants
          can make an appointment and talk with them directly. Abroad Inquiry
          works for almost every popular study destination that the aspirants
          can check from the website.
        </Caption>

        <Subheading>Acceptance of Terms and Conditions:</Subheading>
        <Caption style={{textAlign: 'justify'}}>
          Browsing Abroad Inquiry, creating an account, accessing and using any
          part of our website means you have accepted these terms and conditions
          and agreed to be bound by them.
        </Caption>

        <Subheading>Changes to These Terms:</Subheading>
        <Caption style={{textAlign: 'justify'}}>
          Abroad Inquiry has the right to change any part of these terms at any
          time. Users must need to obey that. Users can always check the website
          for new changes.
        </Caption>

        <Subheading>Account Security:</Subheading>
        <Caption style={{textAlign: 'justify'}}>
          By creating an account on Abroad Inquiry's website, the user must
          secure their account. Somehow, if the user loses or forgets the
          account, immodestly, the user has to contact us. Abroad Inquiry will
          help the user to recover their account again. It is suggested that the
          user should use a secure email address and a strong password for their
          account.
        </Caption>

        <Subheading>Responsibility as a user:</Subheading>
        <Caption style={{textAlign: 'justify'}}>
          The user must have some responsibility. Responsibilities are given
          below:
        </Caption>

        <Caption>
          {'\u2B24'} Do not try to misuse our information and websites.
        </Caption>
        <Caption>
          {'\u2B24'} Abroad Inquiry strongly advised not to involve any sexual
          harassment, hate speech towards any of the users and staff of Abroad
          Inquiry. If any of the users and staff are found guilty according to
          Bangladesh National Law, Abroad Inquiry will remove his/her position
          from Abroad Inquiry permanently.
        </Caption>

        <Caption>
          {'\u2B24'} Make sure that the user knows why the user is accessing
          Abroad Inquiry's website.{' '}
        </Caption>
        <Caption>
          {'\u2B24'} Do not try to copy any information from this website.{' '}
        </Caption>
        <Caption>
          Be careful when the aspirant will talk with any of Abroad Inquiry's
          admin or experts. The aspirants must be cautious of their language and
          behavior. If Abroad Inquiry sees any lousy manner, Abroad Inquiry will
          ban that person.{' '}
        </Caption>

        <Subheading>Privacy, Data, and Cookie Statement:</Subheading>
        <Caption style={{textAlign: 'justify'}}>
          Abroad Inquiry app will carefully evaluate each and every student and
          suggest to them the best option that matches their profile and
          interest. Abroad Inquiry is acting as a bridge between the student’s
          higher education dream and their preferred universities. Abroad
          Inquiry is always strict for the user's personal information not to be
          shared with a third party. If Abroad Inquiry intends to share user’s
          data with a third party, Abroad Inquiry will share the statement, and
          users can always check the announcement on our website. Once users
          enter the website, Abroad Inquiry will automatically keep users' data
          for further contact, promotion, and survey purposes. If any users
          apply for the cancellation/delete of his/her account and data at that
          time, Abroad Inquiry will delete all of the information and data for
          that person from Abroad Inquiry’s database within five working days.
        </Caption>
        <Subheading>Refund Policy and Service Charge Conditions:</Subheading>
        <Caption style={{textAlign: 'justify'}}>
          Abroad Inquiry will refund the aspirant’s full registration charge if
          Abroad Inquiry fails to get the aspirant’s offer letter. In case of
          visa refusal, Abroad Inquiry will not charge any fees for admission,
          visa, or registration cost that Abroad Inquiry charges for services.
          However, if aspirants want to withdraw their application after
          submitting the paper and after registration from Abroad Inquiry,
          Abroad Inquiry will not refund the aspirant’s registration fees.
          Furthermore, for example, Abroad Inquiry can accomplish the
          application process and get the positive result (visa)/admission of
          the application if the applicant does not want to go abroad for his or
          her personal circumstances. In that case, Abroad Inquiry will still
          charge the registration fees, service fees, and the applicant is bound
          to pay the service fees to Abroad Inquiry.
        </Caption>

        <Subheading>Disclaimer:</Subheading>
        <Caption style={{textAlign: 'justify'}}>
          Abroad Inquiry team will only accept files of the students who are
          eligible to make applications abroad. In addition, we guide students
          with real-life scenarios abroad. We don’t waste any students’ time by
          false hope!
          {'\n\n'}
          Abroad Inquiry will provide students full support for their university
          application, scholarship application, and visa application via expert
          mentors. Abroad Inquiry never guarantees students’ 100% confirmation
          either in university admission or visa approval. However, as we have
          expert mentors, you have a very high chance of getting your foreign
          university admission and visa worldwide.
          {'\n\n'}
          Moreover, students need to pay all the additional costs in the whole
          process, which include- university application fee (if applicable),
          Embassy/VFS fee (if applicable), consulate fee (if applicable), DHL
          fee (if applicable), etc.
          {'\n\n'}
          If aspirants have any questions regarding the refund policy, service
          charge policy, privacy policy, and term conditions, do not hesitate to
          contact us.
          {'\n\n'}
          {'\n\n'}
          {'\n\n'}
          {'\n\n'}
        </Caption>
      </ScrollView>
    </View>
  );
};

export default PrivacyPolicy;

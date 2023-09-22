import { Body } from '@react-email/body';
// import { Button } from '@react-email/button';
import { Container } from '@react-email/container';
import { Column } from '@react-email/column';
import { Head } from '@react-email/head';
import { Heading } from '@react-email/heading';
import { Hr } from '@react-email/hr';
import { Html } from '@react-email/html';
// import { Img } from '@react-email/img';
// import { Link } from '@react-email/link';
import { Preview } from '@react-email/preview';
import { Row } from '@react-email/row';
import { Section } from '@react-email/section';
import { Tailwind } from '@react-email/tailwind';
import { Text } from '@react-email/text';
  import * as React from 'react';
  
  interface SubscribedEmailProps {
    userFirstName?: string;
    // userImage?: string;
    plan?: string;
  }
  
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';
  
  export const SubscribedEmail = ({
    userFirstName = 'Hassan',
    // userImage = `${baseUrl}/static/vercel-user.png`,
    plan = "Basic",
  }: SubscribedEmailProps) => {
    const previewText = `Subscribed to ${plan} on Vercel`;
  
    return (
      <Html>
        <Head />
        <Preview>{previewText}</Preview>
        <Tailwind>
          <Body className="bg-white my-auto mx-auto font-mona">
            <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
              <Section className="mt-[32px]">
                {/* <Img
                  src={`${baseUrl}/static/vercel-logo.png`}
                  width="40"
                  height="37"
                  alt="Vercel"
                  className="my-0 mx-auto"
                /> */}
              </Section>
              <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                Subscribed to <strong>Coscribe</strong>
              </Heading>
              <Text className="text-black text-[14px] leading-[24px]">
                Hello {userFirstName},
              </Text>
              <Text className="text-black text-[14px] leading-[24px]">
                Thanks for joining!
              </Text>
              {/* <Text className="text-black text-[14px] leading-[24px]">
                <strong>bukinoshita</strong> (
                <Link
                  href={`mailto:${invitedByEmail}`}
                  className="text-blue-600 no-underline"
                >
                  {invitedByEmail}
                </Link>
                ) has invited you to the <strong>{teamName}</strong> team on{' '}
                <strong>Vercel</strong>.
              </Text> */}
              <Section>
                <Row>
                  <Column align="right">
                    {/* <Img className="rounded-full" src={userImage} width="64" height="64" /> */}
                  </Column>
                  <Column align="center">
                    {/* <Img
                      src={`${baseUrl}/static/vercel-arrow.png`}
                      width="12"
                      height="9"
                      alt="invited you to"
                    /> */}
                  </Column>
                  <Column align="left">
                    {/* <Img className="rounded-full" src={teamImage} width="64" height="64" /> */}
                  </Column>
                </Row>
              </Section>
              <Section className="text-center mt-[32px] mb-[32px]">
                {/* <Button
                  pX={20}
                  pY={12}
                  className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center"
                  href={inviteLink}
                >
                  Join the team
                </Button> */}
              </Section>
              {/* <Text className="text-black text-[14px] leading-[24px]">
                or copy and paste this URL into your browser:{' '}
                <Link
                  href={inviteLink}
                  className="text-blue-600 no-underline"
                >
                  {inviteLink}
                </Link>
              </Text> */}
              <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
              {/* <Text className="text-[#666666] text-[12px] leading-[24px]">
                This invitation was intended for{' '}
                <span className="text-black">{userFirstName} </span>.This invite was sent from{' '}
                <span className="text-black">{inviteFromIp}</span> located in{' '}
                <span className="text-black">{inviteFromLocation}</span>. If you were not
                expecting this invitation, you can ignore this email. If you are
                concerned about your account's safety, please reply to this email to
                get in touch with us.
              </Text> */}
            </Container>
          </Body>
        </Tailwind>
      </Html>
    );
  };
  
  export default SubscribedEmail;
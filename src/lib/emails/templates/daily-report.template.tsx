import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Tailwind,
  Text,
} from "@react-email/components";

type DailyReportEmailTemplateProps = {};

export function DailyReportEmailTemplate(
  props: Readonly<DailyReportEmailTemplateProps>
) {
  return (
    <Tailwind>
      <Html>
        <Head />
        <Tailwind>
          <Body className="bg-white my-auto mx-auto font-sans px-2">
            <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
              <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0"></Heading>
              <Text className="text-black text-[14px] leading-[24px]">
                Hello <strong></strong>,
              </Text>
              <Text className="text-black text-[14px] leading-[24px]">
                Here's your daily report:
              </Text>
              {/* Add Report Content Here Later */}
              <Text>Best Regards,</Text>
              <Text>The Stark Trade Team.</Text>
              <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
              <Text className="text-[#666666] text-[12px] leading-[24px]">
                This recovery email was intended for{" "}
                <span className="text-black">{}</span>. If you were not
                expecting this report, you can ignore this email. If you are
                concerned about your account&apos;s safety, please reply to this
                email to get in touch with us.
              </Text>
            </Container>
          </Body>
        </Tailwind>
      </Html>
    </Tailwind>
  );
}

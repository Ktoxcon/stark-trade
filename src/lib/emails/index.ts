import { render } from "@react-email/components";
import { emailClient } from "@stark-trade/lib/clients/email";
import { DailyReportEmailTemplate } from "./templates/daily-report.template";

export async function sendDailyReportEmail() {
  const html = await render(DailyReportEmailTemplate({}));

  await emailClient.sendMail({
    from: '"Stark Trade Team" <reports@stark-trade.com>',
    to: "",
    subject: "New Daily Transactions Report",
    text: "Daily Transactions Report",
    html,
  });
}

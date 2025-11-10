import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// メール送信先アドレス（環境変数から取得）
// 本番環境では環境変数が必須、開発環境ではデフォルト値を使用
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || (process.env.NODE_ENV === 'production' ? undefined : 'ttmakhr1028@gmail.com')

// HTMLエスケープ関数（XSS対策）
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}

export async function POST(request: NextRequest) {
  try {
    // 環境変数の検証（本番環境）
    if (process.env.NODE_ENV === 'production' && !RECIPIENT_EMAIL) {
      console.error('RECIPIENT_EMAIL environment variable is required in production')
      return NextResponse.json(
        { error: 'サーバー設定エラーが発生しました' },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { name, email, subject, message } = body

    // バリデーション
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'すべてのフィールドを入力してください' },
        { status: 400 }
      )
    }

    // 入力値の長さチェック
    if (name.length > 100) {
      return NextResponse.json(
        { error: 'お名前は100文字以内で入力してください' },
        { status: 400 }
      )
    }
    if (email.length > 255) {
      return NextResponse.json(
        { error: 'メールアドレスが長すぎます' },
        { status: 400 }
      )
    }
    if (subject.length > 200) {
      return NextResponse.json(
        { error: '件名は200文字以内で入力してください' },
        { status: 400 }
      )
    }
    if (message.length > 5000) {
      return NextResponse.json(
        { error: 'メッセージは5000文字以内で入力してください' },
        { status: 400 }
      )
    }

    // メールアドレスの形式チェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: '有効なメールアドレスを入力してください' },
        { status: 400 }
      )
    }

    // Nodemailerの設定
    // 環境変数からSMTP設定を取得（設定されていない場合はGmailのデフォルト設定を使用）
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER || process.env.EMAIL_USER,
        pass: process.env.SMTP_PASS || process.env.EMAIL_PASSWORD,
      },
    })

    // HTMLエスケープ（XSS対策）
    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safeSubject = escapeHtml(subject)
    const safeMessage = escapeHtml(message)

    // メール送信
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.EMAIL_USER || email,
      to: RECIPIENT_EMAIL,
      replyTo: email,
      subject: `【お問い合わせ】${subject}`,
      text: `
お問い合わせがありました。

【お名前】
${name}

【メールアドレス】
${email}

【件名】
${subject}

【メッセージ】
${message}

---
このメールは、ポートフォリオサイトのお問い合わせフォームから送信されました。
      `.trim(),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e293b; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">
            お問い合わせがありました
          </h2>
          
          <div style="margin-top: 20px;">
            <p style="margin: 10px 0;"><strong style="color: #475569;">お名前：</strong> ${safeName}</p>
            <p style="margin: 10px 0;"><strong style="color: #475569;">メールアドレス：</strong> <a href="mailto:${safeEmail}" style="color: #3b82f6;">${safeEmail}</a></p>
            <p style="margin: 10px 0;"><strong style="color: #475569;">件名：</strong> ${safeSubject}</p>
          </div>
          
          <div style="margin-top: 30px; padding: 15px; background-color: #f8fafc; border-left: 4px solid #3b82f6;">
            <p style="margin: 0 0 10px 0;"><strong style="color: #475569;">メッセージ：</strong></p>
            <p style="margin: 0; color: #334155; white-space: pre-wrap;">${safeMessage}</p>
          </div>
          
          <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">
            このメールは、ポートフォリオサイトのお問い合わせフォームから送信されました。
          </p>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json(
      { message: 'メールの送信が完了しました' },
      { status: 200 }
    )
  } catch (error) {
    console.error('メール送信エラー:', error)
    return NextResponse.json(
      { error: 'メールの送信に失敗しました。しばらく時間をおいて再度お試しください。' },
      { status: 500 }
    )
  }
}


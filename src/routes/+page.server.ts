// src/routes/contact/+page.server.js
import { fail, type Actions } from '@sveltejs/kit';
import nodemailer from 'nodemailer';
import { env } from '$env/dynamic/private';
// import { Resend } from 'resend';

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'brenoca35@gmail.com',
		pass: env.GMAIL_PASSWORD
	}
});

// const resend = new Resend(env.RESEND_API_KEY);

function isValidEmail(email: string) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

function sanitizeInput(input: string | FormDataEntryValue | null) {
	return input?.toString().trim().replace(/[<>]/g, '') || '';
}

export const actions = {
	send: async ({ request }) => {
		try {
			const data = await request.formData();

			console.log(data);
			const name = sanitizeInput(data.get('name'));
			const email = sanitizeInput(data.get('email'));
			const message = sanitizeInput(data.get('message'));

			// if (!name || name.length < 2) {
			//     console.log("ERRO")
			// 	return fail(400, { message: 'Name is required and must be at least 2 characters long' });
			// }

			if (!email || !isValidEmail(email)) {
				console.log('ERRO');
				return fail(400, { message: 'Valid email address is required' });
			}

			// if (!message || message.length < 10) {
			//     console.log("ERRO")
			// 	return fail(400, {
			// 		message: 'Message is required and must be at least 10 characters long'
			// 	});
			// }

			// await transporter.verify();

			const mailOptions = {
				from: `"${name}" <brenoca35@gmail.com>`,
				to: 'oliveira.brenobrandao@gmail.com',
				subject: `Novo Contato pelo Formulário de ${name}`,
				html: `
				<div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #fafbff; border-radius: 14px; box-shadow: 0 6px 24px 0 rgba(36,37,38,0.10); padding: 32px 24px;">
					<header style="text-align: center; margin-bottom: 28px;">
						<h2 style="color: hsl(249.3, 100%, 53.5%); border-bottom: 3px solid hsl(249.3, 100%, 53.5%); display: inline-block; padding-bottom: 6px; margin: 0;">
							Novo Contato Recebido
						</h2>
						<p style="color: #8b8fa9; font-size: 15px; margin-top: 8px;">Você recebeu uma nova mensagem através do seu formulário de contato.</p>
					</header>
					
					<section style="background: hsl(249.3, 100%, 97%); padding: 18px 20px; border-radius: 10px; margin-bottom: 24px; border: 1px solid hsl(249.3, 100%, 93%);">
						<h3 style="margin: 0 0 12px 0; color: hsl(249.3, 100%, 53.5%); font-size: 18px;">Detalhes do Contato</h3>
						<div style="font-size: 16px;">
							<p style="margin: 6px 0;"><strong>Nome:</strong> ${name}</p>
							<p style="margin: 6px 0;"><strong>E-mail:</strong> <a style="color: hsl(249.3, 100%, 53.5%);" href="mailto:${email}">${email}</a></p>
						</div>
					</section>
					
					<section style="background: #fff; padding: 20px 22px; border: 1px solid hsl(249.3, 100%, 93%); border-radius: 10px; margin-bottom: 24px;">
						<h3 style="margin: 0 0 10px 0; color: hsl(249.3, 100%, 53.5%); font-size: 18px;">Mensagem</h3>
						<p style="line-height: 1.7; white-space: pre-wrap; font-size: 16px; color: #383d55; margin: 0;">${message}</p>
					</section>
					
					<footer style="margin-top: 14px; padding: 14px 18px; background: hsl(249.3, 100%, 97%); border-radius: 8px; font-size: 14px; color: #7b7e93;">
						<p style="margin: 0 0 4px 0;"><strong>Enviado de:</strong> Formulário de Contato</p>
						<p style="margin: 0 0 4px 0;"><strong>Data e Hora:</strong> ${new Date().toLocaleString('pt-BR')}</p>
						<p style="margin: 0;"><strong>Responder para:</strong> <a style="color: hsl(249.3, 100%, 53.5%);" href="mailto:${email}">${email}</a></p>
					</footer>
				</div>
    `
			};

			const info = await transporter.sendMail(mailOptions);

			console.log('Message sent: %s', info);

			return {
				success: true,
				message: 'Message sent successfully!'
			};
		} catch (error) {
			console.error('Error sending email:', error);
		}
	}
} satisfies Actions;

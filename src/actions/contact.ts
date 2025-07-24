
'use server';

import { z } from 'zod';
import sgMail from '@sendgrid/mail';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères." }),
  email: z.string().email({ message: "Veuillez entrer une adresse e-mail valide." }),
  subject: z.string().min(5, { message: "Le sujet doit contenir au moins 5 caractères." }),
  message: z.string().min(10, { message: "Le message doit contenir au moins 10 caractères." }),
});

type ContactFormInput = z.infer<typeof contactFormSchema>;

export async function submitContactForm(
  data: ContactFormInput
): Promise<{ success: boolean; message: string }> {

  const validation = contactFormSchema.safeParse(data);

  if (!validation.success) {
    return {
      success: false,
      message: validation.error.errors.map((e) => e.message).join(', '),
    };
  }

  const sendGridApiKey = process.env.SENDGRID_API_KEY;
  const toEmail = process.env.SENDGRID_TO_EMAIL;
  const fromEmail = process.env.SENDGRID_FROM_EMAIL;

  if (!sendGridApiKey || !toEmail || !fromEmail) {
      console.error("One or more SendGrid environment variables are not set.");
      return { 
          success: false, 
          message: "Le service de messagerie n'est pas correctement configuré. Veuillez contacter l'administrateur du site." 
      };
  }
  
  sgMail.setApiKey(sendGridApiKey);
  const { name, email, subject, message } = validation.data;

  const msg = {
    to: toEmail,
    from: fromEmail,
    subject: `Nouveau message de contact: ${subject}`,
    replyTo: email,
    html: `
      <h1>Nouvelle soumission de contact</h1>
      <p><strong>Nom:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Sujet:</strong> ${subject}</p>
      <hr>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `,
  };

  try {
    await sgMail.send(msg);
    return {
      success: true,
      message: "Votre message a été envoyé avec succès !",
    };
  } catch (error: any) {
    console.error("Failed to send email via SendGrid:", error);
    
    // Provide a more specific error message based on SendGrid's response
    let errorMessage = "Une erreur inattendue s'est produite lors de l'envoi du message.";
    if (error.response && error.response.body && error.response.body.errors) {
       errorMessage = error.response.body.errors.map((e: { message: string }) => e.message).join(', ');
    }
    
    return {
      success: false,
      message: `Échec de l'envoi de l'e-mail. Erreur SendGrid: ${errorMessage}. Veuillez vérifier la configuration de votre compte SendGrid.`,
    };
  }
}

import { supabase } from '../lib/supabase';
import { ContactForm } from '../types';

export const submitContactForm = async (contactData: ContactForm): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('contacts')
      .insert({
        name: contactData.name,
        email: contactData.email,
        phone: contactData.phone,
        message: contactData.message,
      });
      
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return false; 
  }
};
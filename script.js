const menu=document.querySelector('.menu'),nav=document.querySelector('.navlinks');function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Abrir menu')}menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Fechar menu':'Abrir menu')});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});const quote=document.getElementById('quote');document.querySelectorAll('[data-quote]').forEach(b=>b.addEventListener('click',()=>{document.getElementById('type').value=b.dataset.quote;document.getElementById('status').textContent='';quote.showModal()}));document.querySelectorAll('dialog').forEach(d=>{d.querySelector('.close').addEventListener('click',()=>d.close());d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}})});document.querySelectorAll('[data-social]').forEach(b=>b.addEventListener('click',()=>{document.getElementById('social-title').textContent=b.dataset.social;document.getElementById('social').showModal()}));document.getElementById('quote-form').addEventListener('submit',event=>{
event.preventDefault();const data=new FormData(event.target);
composeEmail('SOLARIN — Solicitação de orçamento', 'Nome: '+data.get('name')+'\nCidade / UF: '+data.get('city')+'\nSolução: '+data.get('type'));
document.getElementById('status').textContent='Conclua o envio no seu aplicativo de e-mail. Se ele não abrir, escreva para luisgfm10@gmail.com.';
});
function composeEmail(subject,body){window.location.href='mailto:luisgfm10@gmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);}

// Configure o número oficial com código do país e DDD, somente dígitos.
// Vazio: abre o WhatsApp com uma mensagem para o visitante escolher o destinatário.
const SOLARIN_WHATSAPP = '';
const whatsappMessages = {
  Simulação: 'Olá, Solarin! Gostaria de simular minha economia com energia solar. Quais informações preciso enviar para receber uma estimativa?',
  Geral: 'Olá, Solarin! Gostaria de saber mais sobre as soluções de energia solar.',
  Dúvidas: 'Olá, Solarin! Tenho algumas dúvidas sobre energia solar. Podem me ajudar?',
  Residencial: 'Olá, Solarin! Gostaria de solicitar um orçamento de instalação residencial.',
  Comercial: 'Olá, Solarin! Gostaria de solicitar um orçamento de instalação comercial.',
  Manutenção: 'Olá, Solarin! Gostaria de solicitar manutenção para meu sistema de energia solar.',
  Orçamento: 'Olá, Solarin! Gostaria de solicitar um orçamento de energia solar.'
};
document.querySelectorAll('[data-whatsapp]').forEach(button => {
  button.addEventListener('click', () => {
    const number = SOLARIN_WHATSAPP.replace(/\D/g, '');
    const message = whatsappMessages[button.dataset.whatsapp] || whatsappMessages.Geral;
    window.open('https://wa.me/' + number + '?text=' + encodeURIComponent(message), '_blank', 'noopener,noreferrer');
  });
});

const leadForm = document.getElementById('lead-form');
const leadPhone = document.getElementById('lead-phone');
const leadCep = document.getElementById('lead-cep');
function validateLead(){
  const phone = leadPhone.value.replace(/\D/g,'');
  leadPhone.setCustomValidity(/^\d{10,11}$/.test(phone) ? '' : 'Informe um telefone com DDD, com 10 ou 11 dígitos.');
  leadCep.setCustomValidity(/^\d{8}$/.test(leadCep.value.replace(/\D/g,'')) ? '' : 'Informe um CEP com 8 dígitos.');
}
[leadPhone, leadCep].forEach(field=>field.addEventListener('input',validateLead));
leadForm.addEventListener('submit',event=>{
  event.preventDefault();validateLead();if(!leadForm.reportValidity())return;
  const name=document.getElementById('lead-name');
  if(!name.value.trim()){name.setCustomValidity('Informe seu nome.');name.reportValidity();return;}
  composeEmail('SOLARIN — Solicitação de orçamento', 'Nome: '+name.value.trim()+'\nTelefone: '+leadPhone.value+'\nCEP: '+leadCep.value);
  document.getElementById('lead-status').textContent='Conclua o envio no aplicativo de e-mail. Se ele não abrir, escreva para luisgfm10@gmail.com.';
});
document.getElementById('lead-name').addEventListener('input',event=>event.target.setCustomValidity(''));

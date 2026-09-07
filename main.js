const menu=document.querySelector('.menu'),nav=document.querySelector('.navlinks');function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Abrir menu')}menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Fechar menu':'Abrir menu')});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});const quote=document.getElementById('quote');document.querySelectorAll('[data-quote]').forEach(b=>b.addEventListener('click',()=>{document.getElementById('type').value=b.dataset.quote;document.getElementById('status').textContent='';quote.showModal()}));document.querySelectorAll('dialog').forEach(d=>{d.querySelector('.close').addEventListener('click',()=>d.close());d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}})});document.querySelectorAll('[data-social]').forEach(b=>b.addEventListener('click',()=>{document.getElementById('social-title').textContent=b.dataset.social;document.getElementById('social').showModal()}));document.getElementById('quote-form').addEventListener('submit',e=>{e.preventDefault();const data=new FormData(e.target);const body='SOLARIN — RESUMO PARA ORÇAMENTO\n\nNome: '+data.get('name').trim()+'\nCidade / UF: '+data.get('city').trim()+'\nSolução: '+data.get('type')+'\n\nResumo criado localmente. Não enviado à empresa.\n';const url=URL.createObjectURL(new Blob(['\ufeff'+body],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='solarin-pedido-de-orcamento.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);document.getElementById('status').textContent='Resumo preparado para download. Nenhum dado foi enviado.'});

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

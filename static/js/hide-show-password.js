function revelar(checkbox, id, openid, closeid)
      {
         const open = document.getElementById(openid).src
         const close = document.getElementById(closeid).src
      if(checkbox.getAttribute('check') === '0')
         {
         checkbox.src = close
         document.getElementById(closeid).src = open
         checkbox.setAttribute('check', '1');
         document.getElementById(id).setAttribute('type', 'password');
      }
      else
         {
         checkbox.src = close
         document.getElementById(closeid).src = open
         checkbox.setAttribute('check', '0');
         document.getElementById(id).setAttribute('type', 'text');
         }
      }

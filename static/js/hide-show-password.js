function revelar(checkbox, id, openid, closeid)
      {
         const open = document.getElementById(openid).src
         const close = document.getElementById(closeid).src
         console.log(checkbox.getAttribute('check'), "wena loco")
      if(checkbox.getAttribute('check') === '0')
         {
         console.log("0", 'uwu')
         checkbox.src = close
         document.getElementById(closeid).src = open
         checkbox.setAttribute('check', '1');
         document.getElementById(id).setAttribute('type', 'password');
      }
      else
         {console.log("1", 'uwu')
         checkbox.src = close
         document.getElementById(closeid).src = open
         checkbox.setAttribute('check', '0');
         document.getElementById(id).setAttribute('type', 'text');
         }
      }

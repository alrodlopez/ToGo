import { Dialog } from 'quasar'
import { Plugins } from '@capacitor/core';
const { Network } = Plugins;

export default async () => {
  let statusNetwork = await Network.getStatus();
  console.log(statusNetwork);
  if(!statusNetwork.connected)
  {
    Dialog.create({
    title: 'Mensaje',
    message: 'Verifique que su dispositivo este conectado a Internet'
    }).onOk(() => {
      navigator['app'].exitApp();
    })
  }
}

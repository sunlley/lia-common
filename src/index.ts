import './common';
import { networkInterfaces } from 'os';
export default {
  getIPv4: () => {
    const ifaces = networkInterfaces();
    let ifaceList = [];
    let result = null;
    for (const ifacesKey in ifaces) {
      let ifname: any = ifaces[ifacesKey];
      for (const ifnameElement of ifname) {
        if (ifnameElement.family === 'IPv4') {
          ifaceList.push(ifnameElement);
          if (ifnameElement.internal === false) {
            result = ifnameElement;
          }
        }
      }
    }
    return result;
  },
};

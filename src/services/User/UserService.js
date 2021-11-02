import * as DeviceInfo from 'react-native-device-info';
import {createUser, getDevice, registerDevice} from '../Airtable/Airtable';

export const handleDevice = async () => {
  const uniqueId = await DeviceInfo.syncUniqueId();
  const findDeviceInDb = await getDevice(uniqueId);

  if (findDeviceInDb) {
    return findDeviceInDb;
  }

  const deviceName = await DeviceInfo.getDeviceName();
  const newUser = await createUser();
  const newDevice = await registerDevice(uniqueId, deviceName, newUser.id);

  return newDevice;
};

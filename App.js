import { useEffect } from "react";
import { View, Text } from "react-native";
import AuthNavigation from "./AuthNavigation";
import * as Updates from 'expo-updates';

export default function App() {

  useEffect(() => {
    reactToUpdates();
  }, [])

  const reactToUpdates = async () => {
    Updates.addListener((e) => {
      if(e.type === Updates.UpdateEventType.UPDATE_AVAILABLE){
        alert("An Update is available. Restart your application to see the changes");
      }
    })
  }

  return <AuthNavigation />
}

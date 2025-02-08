import {
  Alert,
  Pressable,
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {SettingsNavigatorParams} from "./SettingsNavigator";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {useEffect, useState} from "react";
import {useCloud} from "../../providers/CloudProvider";

type X = {
  title: string;
  data: {
    title: string;
    theme?: 'default' | 'danger' | 'success';
    onPress?: () => void;
  }[];
}

export default function SettingsOverview() {
  const navigation = useNavigation<SettingsNavigatorParams>()
  const [sections, setSections] = useState<X[]>([])
  const {signedIn, signOut} = useCloud()

  useEffect(() => {
    setSections([{
      title: 'Account',
      data: [
        signedIn ? {
          title: 'Sign out',
          theme: 'danger',
          onPress: () => handleSignOut()
        } : {
          title: 'Sign in',
          onPress: () => navigation.navigate('SettingsAccount')
        },
        {
          title: 'Sync'
        }

      ],
    },
      {
        title: 'Management',
        data: [
          {
            title: 'Ingredients',
            onPress: () => navigation.navigate('SettingsIngredients')
          },
          {
            title: 'Import'
          },
          {
            title: 'Export'
          }
        ]
      }])
  }, [signedIn])

  async function handleSignOut() {
    Alert.alert('Sign out', 'Are you sure you want to sign out?', [{text: 'Cancel'}, {
      text: 'Sign out', onPress: async () => {
        await signOut()
      },
      style: 'destructive'
    }])
  }

  function getItemStyle(index: number, length: number) {
    const radius = 10

    if (length === 1) {
      return {borderRadius: radius}
    }

    if (index === length - 1) {
      return {borderBottomLeftRadius: radius, borderBottomRightRadius: radius}
    }

    if (index === 0) {
      return {borderTopLeftRadius: radius, borderTopRightRadius: radius}
    }

    return {}
  }

  return (
      <SafeAreaView style={{flex: 1}}>
        <SectionList
            contentInsetAdjustmentBehavior="automatic"
            stickySectionHeadersEnabled={false}
            sections={sections}
            keyExtractor={(item, index) => item.title + index}
            renderItem={({item, index, section}) => (
                <Pressable onPress={item.onPress}>
                  <View style={[styles.option, getItemStyle(index, section.data.length)]}>
                    <Text style={styles.text}>{item.title}</Text>
                    <MaterialCommunityIcons name="chevron-right" size={24}
                                            style={{color: '#bbbbbb'}}/>
                  </View>
                </Pressable>
            )}
            renderSectionHeader={({section: {title}}) => (
                <Text style={styles.header}>{title}</Text>
            )}
            ItemSeparatorComponent={() => (<View style={styles.separator}></View>)}
        />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  option: {
    flex: 1,
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginLeft: 16,
    marginRight: 16,
    backgroundColor: '#ffffff',
  },
  text: {
    fontWeight: 500,
    fontSize: 16,
  },
  header: {
    margin: 16,
    fontWeight: 700,
    fontSize: 16,
  },
  separator: {
    backgroundColor: '#bbbbbb',
    height: 0.5,
    flex: 1,
    marginLeft: 16,
    marginRight: 16,
  }
});

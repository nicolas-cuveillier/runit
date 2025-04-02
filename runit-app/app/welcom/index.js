import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Link, Redirect, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Typography, Colors } from "@styles"
import { useAuth } from "@/contexts/auth-context";

export default function Welcom() {
  const titles = ["Find a club, Join a community & Participate to runs", "Create a club, Grow your community & Organize runs"]
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      setIndex((index + 1) % 2)
    }, 5000);

    return () => clearInterval(interval)
  }, []);

  const { authState } = useAuth();
  
  return (
    <View style={styles.container}>
      <View style={{ gap: 15 }}>
        <Text style={styles.title}>{titles[index]}</Text>

        <View style={styles.carouselContainer}>
          <View style={index == 0 ? styles.carouselFull : styles.carouselEmpty} />
          <View style={index == 0 ? styles.carouselEmpty : styles.carouselFull} />
        </View>

        <Text style={styles.subtitle}>All in one place.</Text>
      </View>

      <Link href={authState.authenticated ? `/user/${authState.user}` : "/login"} replace={true} style={{ width: '80%' }}>
        <View style={styles.button} >
          <Text style={styles.buttonText}>Get started</Text>
          <Ionicons name="chevron-forward-circle-outline" color="white" style={{ fontSize: 18 }} />
        </View>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    padding: 16,
    gap: 80,
    backgroundColor: Colors.PRIMARY_100
  },
  title: {
    fontFamily: Typography.FONT_BOLD.fontFamily,
    fontWeight: Typography.FONT_BOLD.fontWeight,
    fontSize: Typography.FONT_SIZE_32,
    textAlign: 'center'
  },
  subtitle: {
    fontFamily: Typography.FONT_REGULAR.fontFamily,
    fontWeight: Typography.FONT_REGULAR.fontWeight,
    fontSize: Typography.FONT_SIZE_18,
    textAlign: 'center'
  },
  button: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.PRIMARY_400,
    borderRadius: 24,
    padding: 16,
    overflow: 'hidden',
  },
  buttonText: {
    fontFamily: Typography.FONT_BOLD.fontFamily,
    fontWeight: Typography.FONT_BOLD.fontWeight,
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_16,
  },
  carouselContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center'
  },
  carouselFull: {
    width: 10,
    height: 10,
    backgroundColor: Colors.PRIMARY_400,
    borderRadius: 5
  },
  carouselEmpty: {
    width: 10,
    height: 10,
    borderWidth: 1.5,
    borderColor: Colors.PRIMARY_400,
    borderRadius: 5
  }
})

import { Redirect } from "expo-router";
import { Typography } from "@styles";

export default function Index() {

  Typography.loadFonts();

  return (
      <Redirect href="welcom" />
  );
}

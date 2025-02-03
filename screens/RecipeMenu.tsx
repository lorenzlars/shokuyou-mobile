import ContextMenu from "react-native-context-menu-view";
import NavigationButton from "../components/NavigationButton";

export default function RecipeMenu() {
  return (
      <ContextMenu
          actions={[{title: "Title 1"}, {title: "Title 2"}]}
          onPress={(e) => {
            console.warn(
                `Pressed ${e.nativeEvent.name} at index ${e.nativeEvent.index}`
            );
          }}
          dropdownMenuMode={true}
      >
        <NavigationButton name="dots-vertical"/>
      </ContextMenu>
  );
};

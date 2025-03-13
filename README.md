# UIFlow - A Simple UI Utility Library

UIFlow is a minimal, reusable UI utility library designed to simplify handling common UI interactions like dialogs, modals, and notifications in React and React Native. It provides hooks and components that make state management and UI handling easier while keeping things lightweight and flexible.

## give🎨 **Headless Components** - Bring your own styles.

- ⚡ **Lightweight & Simple** - No unnecessary dependencies.
- 🔗 **React & React Native Compatible** - Works across web and mobile.
- 🌍 **Open Source** - Free to use and modify.

## Example: `useDialog` Hook

The `useDialog` hook helps manage dialogs easily, handling visibility and state changes.

### Installation

Currently, UIFlow is not a published package. You can copy the `useDialog` hook into your project or clone the repository.

```sh
# Clone the repository
git clone https://github.com/your-repo/UIFlow.git
```

### Usage

#### 1. Setup `DialogProvider`

Wrap your application with `DialogProvider` to enable dialogs globally.

```tsx
import { DialogProvider } from "./hooks/useDialog";

const App = () => {
  return (
    <DialogProvider>
      <MainComponent />
    </DialogProvider>
  );
};
```

#### 2. Use `useDialog` in a component

```tsx
import { useDialog } from "./hooks/useDialog";

const MyComponent = () => {
  const openDialog = useDialog();

  return (
    <button onClick={() => openDialog({
      title: "Confirm Action",
      description: "Are you sure you want to continue?",
      onConfirm: () => console.log("Confirmed!")
    })}>
      Open Dialog
    </button>
  );
};
```

## Future Plans

- Publish as an **npm package**.
- Add more UI utilities like **toasts, loaders, and popovers**.
- Support **custom animations** and **themes**.

---

📢 **Contribute & Improve**
Since this is an evolving project, contributions and suggestions are welcome!

🔗 **GitHub Repo:** [[https://github.com/Asad-Ali910/UIFlow/]]

🚀 **Let's build better UI together!**


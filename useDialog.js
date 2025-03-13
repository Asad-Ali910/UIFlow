import React, { useState, createContext, useContext } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const DialogContext = createContext(null);

export const DialogProvider = ({ children }) => {
  const [state, setState] = useState({
    visible: false,
    config: {
      title: "Dialog",
      description: "",
      inputs: [],
      onConfirm: null,
    },
  });

  const openDialog = (config) => {
    setState({ visible: true, config: { ...state.config, ...config } });
  };

  const closeDialog = () => {
    setState((prev) => ({ ...prev, visible: false }));
  };

  return (
    <DialogContext.Provider value={openDialog}>
      {children}
      {state.visible && (
        <DialogBox
          config={state.config}
          closeDialog={() => setState({ ...state, visible: false })}
        />
      )}
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  return useContext(DialogContext);
};

const DialogBox = ({ config, closeDialog }) => {
  const [inputValues, setInputValues] = useState({});

  const handleInputChange = (label, value) => {
    setInputValues((prev) => ({
      ...prev,
      [label]: value,
    }));
  };

  const handleConfirm = () => {
    if (config.onConfirm) {
      config.onConfirm(inputValues);
    }
    closeDialog();
  };

  const isOnConfirmProvided = () => {
    return typeof config.onConfirm === "function";
  };

  return (
    <Modal transparent={true} animationType="fade" visible={true}>
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          <Text style={styles.title}>{config.title}</Text>
          {config.description ? (
            <Text style={styles.description}>{config.description}</Text>
          ) : null}

          {config.inputs?.map((input, index) => (
            <View key={index} style={styles.inputContainer}>
              <Text style={styles.label}>{input.label}</Text>
              <TextInput
                style={styles.input}
                placeholder={input.placeholder || ""}
                value={inputValues[input.name] || ""}
                onChangeText={(text) =>
                  setInputValues((prev) => ({
                    ...prev,
                    [input.name]: text,
                  }))
                }
              />
            </View>
          ))}

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={closeDialog}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            {isOnConfirmProvided() && (
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleConfirm}
              >
                <Text style={styles.confirmText}>Confirm</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  dialog: {
    width: "85%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 15,
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    marginRight: 10,
  },
  confirmButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#007BFF",
    borderRadius: 15,
  },
  cancelText: {
    fontSize: 16,
    color: "#333",
  },
  confirmText: {
    fontSize: 16,
    color: "white",
  },
});

export default useDialog;

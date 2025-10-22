import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { z } from 'zod';

interface TextFieldProps extends Omit<TextInputProps, 'style' | 'onChangeText'> {
  value: string;
  
  onChangeText: (text: string) => void;
  
  schema: z.ZodSchema;
  
  label?: string;
  
  helperText?: string;
  
  leftIcon?: React.ReactNode;
  
  rightIcon?: React.ReactNode;
  
  disabled?: boolean;
  
  validateOnChange?: boolean;
  
  showSuccessState?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({
  value,
  onChangeText,
  schema,
  label,
  helperText,
  leftIcon,
  rightIcon,
  disabled = false,
  validateOnChange = false,
  showSuccessState = true,
  secureTextEntry,
  ...textInputProps
}) => {
  const [error, setError] = useState<string>('');
  
  const [touched, setTouched] = useState(false);
  
  const [isFocused, setIsFocused] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = secureTextEntry === true;
  
  const isValid = !error && touched && value.length > 0;

  const validate = (text: string) => {
    try {      schema.parse(text);
      setError('');
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.issues[0].message);
      }
      return false;
    }
  };


  const handleChangeText = (text: string) => {
    onChangeText(text);
    if (validateOnChange && touched) {
      validate(text);
    }
  };


  const handleBlur = () => {
    setTouched(true);
    setIsFocused(false);
    validate(value);
  };


  const handleFocus = () => {
    setIsFocused(true);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getBorderColor = () => {
    if (disabled) return '#e5e5e5';
    if (error && touched) return '#ef4444';
    if (isValid && showSuccessState) return '#10b981';
    if (isFocused) return '#3b82f6';
    return '#d1d5db';
  };

  return (
    <View style={styles.container}>
      {label && (
        <Text style={StyleSheet.flatten([
          styles.label,
          disabled ? styles.labelDisabled : null,
        ])}>
          {label}
        </Text>
      )}
      
      <View style={StyleSheet.flatten([
        styles.inputContainer,
        { borderColor: getBorderColor() },
        disabled ? styles.inputContainerDisabled : null,
      ])}>
        {leftIcon && (
          <View style={styles.iconLeft}>
            {leftIcon}
          </View>
        )}
        
        <TextInput
          style={StyleSheet.flatten([
            styles.input,
            leftIcon ? styles.inputWithLeftIcon : null,
            (rightIcon || isPasswordField) ? styles.inputWithRightIcon : null,
            disabled ? styles.inputDisabled : null,
          ])}
          value={value}
          onChangeText={handleChangeText}
          onBlur={handleBlur}
          onFocus={handleFocus}
          secureTextEntry={isPasswordField && !showPassword}
          editable={!disabled}
          placeholderTextColor="#9ca3af"
          {...textInputProps}
        />

        {isPasswordField && (
          <Pressable 
            onPress={togglePasswordVisibility}
            style={styles.iconRight}
          >
            <Text style={styles.eyeIcon}>
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </Text>
          </Pressable>
        )}

        {!isPasswordField && rightIcon && (
          <View style={styles.iconRight}>
            {rightIcon}
          </View>
        )}

        {isValid && showSuccessState && !isPasswordField && (
          <View style={styles.iconRight}>
            <Text style={styles.checkIcon}>✓</Text>
          </View>
        )}
      </View>

      {helperText && !error && !touched && (
        <Text style={styles.helperText}>{helperText}</Text>
      )}

      {error && touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {isValid && showSuccessState && (
        <View style={styles.successContainer}>
          <Text style={styles.successIcon}>✓</Text>
          <Text style={styles.successText}>Campo válido</Text>
        </View>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    marginLeft: 4,
    color: '#374151',
  },
  labelDisabled: {
    color: '#9ca3af',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 12,
    backgroundColor: '#fff',
    minHeight: 52,
    paddingHorizontal: 4,
  },
  inputContainerDisabled: {
    backgroundColor: '#f9fafb',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  inputWithLeftIcon: {
    paddingLeft: 4,
  },
  inputWithRightIcon: {
    paddingRight: 4,
  },
  inputDisabled: {
    color: '#9ca3af',
  },
  iconLeft: {
    paddingLeft: 12,
    paddingRight: 4,
  },
  iconRight: {
    paddingRight: 12,
    paddingLeft: 4,
  },
  eyeIcon: {
    fontSize: 20,
  },
  checkIcon: {
    fontSize: 20,
    color: '#10b981',
    fontWeight: 'bold',
  },
  helperText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
    marginLeft: 4,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginLeft: 4,
  },
  errorIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    flex: 1,
  },
  successContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginLeft: 4,
  },
  successIcon: {
    fontSize: 14,
    color: '#10b981',
    marginRight: 4,
    fontWeight: 'bold',
  },
  successText: {
    color: '#10b981',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default TextField;
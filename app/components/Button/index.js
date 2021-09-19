import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

const Button = ({title, onPress, icon, disabled = false, styleOverrides}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      disabled={disabled}
      hitSlop={{top: 16, bottom: 16, left: 16, right: 16}}
      style={[
        styles.container,
        styleOverrides?.container,
        {opacity: disabled ? 0.6 : 1},
      ]}>
      {icon && <View style={styleOverrides?.iconContainer}>{icon}</View>}
      {title && <Text style={styleOverrides?.title}>{title}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Button;

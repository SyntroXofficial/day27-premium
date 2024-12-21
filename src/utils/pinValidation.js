export const validatePin = (inputPin, service, rarityConfigs) => {
  // Get the correct pin from rarity config
  const rarityConfig = rarityConfigs[service.rarity];
  const correctPin = rarityConfig?.pin;

  // Compare the input pin with the correct pin
  return inputPin === correctPin;
};
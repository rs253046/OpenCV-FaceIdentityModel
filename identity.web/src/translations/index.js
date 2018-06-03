export default function(lang) {
  const requireAll = (requireContext) => {
    return requireContext.keys().map(requireContext);
  };

  const generateTranslations = (lang) => {
    const translation = {};
    const translationList = requireAll(require.context('../translations', true, /^\.\/.*\.json$/));
    translationList.forEach(obj => {
      Object.assign(translation, obj);
    });
    return translation;
  };

  return generateTranslations(lang);
}

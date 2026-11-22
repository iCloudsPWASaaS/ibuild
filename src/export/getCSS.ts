
export async function getCSS() {
  const style = await fetch("/website/theme.css").then(r => r.text());
  const designstyle = await fetch("/website/designstyle.css").then(r => r.text());
  const animations = await fetch("/website/animations.css").then(r => r.text());

  return { style, animations, designstyle };
}
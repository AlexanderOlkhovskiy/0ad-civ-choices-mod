function initCivChoicesDialog()
{
	if (g_ViewedPlayer < 0)
		return;

	let currentPlayer = g_Players[g_ViewedPlayer];
	let civChoices = g_CivData[currentPlayer.civ].CivChoices;
	if (civChoices === undefined)
		return;

	for (let i = 0; i < civChoices.length; ++i)
	{
		let civChoiceTechResearched = Engine.GuiInterfaceCall("IsTechnologyResearched", {
			"tech": civChoices[i],
			"player": g_ViewedPlayer
		});
		if (civChoiceTechResearched)
			return;
	}

	for (let i = 0; i < civChoices.length; ++i)
	{
		let civChoiceButton = Engine.GetGUIObjectByName("civChoice[" + i + "]");
		civChoiceButton.caption = GetTechnologyData(civChoices[i]).name.generic;

		let size = civChoiceButton.size;
		size.top = 20 * i;
		size.bottom = 20 * (i + 1);
		civChoiceButton.size = size;

		civChoiceButton.onPress = (function(tech) { return function() {
			Engine.PostNetworkCommand({ "type": "civ-choice", "template": tech });
			Engine.GetGUIObjectByName("civChoicesDialogPanel").hidden = true;
		}})(civChoices[i]);

		civChoiceButton.hidden = false;
	}
	Engine.GetGUIObjectByName("civChoicesDialogPanel").hidden = false;
}

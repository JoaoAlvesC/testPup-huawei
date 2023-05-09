Dim objShell
Set objShell = WScript.CreateObject ("WScript.shell")
Set objFSO = CreateObject("Scripting.FileSystemObject")
strDirectory = objFSO.BuildPath(objShell.SpecialFolders("MyDocuments"), strDirectory)
WScript.Echo "A ONT vai ser atualizada!"
objShell.run "cmd /K CD " + strDirectory +  "/testPup-huawei/src & node index.js"
WScript.Timeout = 3
' Set your settings
    strFileURL = "http://localhost:3199/api/v1/login"

' Fetch the file
    Set objXMLHTTP = CreateObject("MSXML2.XMLHTTP")

    objXMLHTTP.open "GET", strFileURL, false
    objXMLHTTP.send()

Set objShell = Nothing
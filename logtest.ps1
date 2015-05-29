
function Write-Web  {

    param (
        $Source,
        $Message, 
        $Color
    )

    $o = New-Object PSObject
    $o | Add-Member -MemberType NoteProperty -Name Source -Value $Source
    $o | Add-Member -MemberType NoteProperty -Name Message -Value $Message
    $o | Add-Member -MemberType NoteProperty -Name Color -Value $Color
    $json = $o | ConvertTo-JSON

    $uri = "http://localhost:3000/log"
    Invoke-WebRequest -Uri $uri -Method POST -Body $json -ContentType "application/json" | Out-Null
}
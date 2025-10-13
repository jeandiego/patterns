function codez
    if test (count $argv) -eq 0
        set dir (pwd)
    else
        set dir $argv[1]
    end
    open -a Zed $dir
end

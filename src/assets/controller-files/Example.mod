
MODULE Example
    
    PERS num counter := 20;
    PERS string myName := "example string";
    PERS bool isValid := TRUE;
    
    PROC main()
        
        WaitTime 1;
        Incr counter;
        !TPWrite ValToStr(counter);
        IF counter > 500 THEN
            counter := 0;
        ENDIF
        
    ENDPROC
    
ENDMODULE
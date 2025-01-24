package com.openclassrooms.ycyw_back.data.utils;

import java.util.Optional;

public class TypeUtils {

    public static <T> Optional<T> cast(Object obj, Class<T> clazz) {
        if (clazz.isInstance(obj)) {
            return Optional.of(clazz.cast(obj));
        }
        return Optional.empty();
    }
}